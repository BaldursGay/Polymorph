use std::{
    fs::{copy, create_dir_all, read_to_string, remove_dir_all, File},
    io::Write,
    path::PathBuf,
};

use tauri::State;
use uuid::Uuid;
use walkdir::WalkDir;

use crate::{
    error::Error,
    models::instance::{InstanceIndex, InstanceInfo},
    AppState,
};

#[tauri::command]
pub fn create_instance(
    instance_name: String,
    image_path: Option<PathBuf>,
    state: State<AppState>,
) -> Result<(), Error> {
    let instance_dir = state.config.lock().unwrap().instances_dir.clone();
    let new_instance_id = Uuid::new_v4();

    let new_instance = InstanceInfo {
        id: new_instance_id,
        name: instance_name,
        order_index: 0,
    };

    create_dir_all(&instance_dir.join(new_instance_id.to_string()))?;

    let mut instance_file = File::create(
        instance_dir
            .join(new_instance_id.to_string())
            .join("instance.json"),
    )?;

    instance_file.write_all(serde_json::to_string_pretty(&new_instance)?.as_bytes())?;

    match image_path {
        Some(path) => {
            let file_extension = &*path.extension().unwrap().to_str().unwrap();

            copy(
                &path,
                &instance_dir
                    .join(&new_instance_id.to_string())
                    .join(format!("instance.{}", file_extension)),
            )?;
        }
        None => {}
    }

    Ok(())
}

#[tauri::command]
pub fn delete_instance(instance_id: Uuid, state: State<AppState>) -> Result<(), Error> {
    let instance_dir = state.config.lock().unwrap().instances_dir.clone();
    remove_dir_all(instance_dir.join(instance_id.to_string()))?;

    let mut instance_index: InstanceIndex =
        serde_json::from_str(read_to_string(instance_dir.join("instances.index.json"))?.as_str())
            .unwrap();
    instance_index.instances.retain(|i| i.id != instance_id);

    let mut index_file = File::create(instance_dir.join("instances.index.json"))?;
    index_file.write_all(serde_json::to_string_pretty(&instance_index)?.as_bytes())?;

    Ok(())
}

#[tauri::command]
pub fn get_instance_info(instance_id: Uuid, state: State<AppState>) -> Result<InstanceInfo, Error> {
    let instances_dir = state.config.lock().unwrap().instances_dir.clone();

    let file = instances_dir
        .join(instance_id.to_string())
        .join("instance.json");

    let info: InstanceInfo = serde_json::from_str(&read_to_string(file)?)?;

    Ok(info)
}

#[tauri::command]
pub fn get_instances(state: State<AppState>) -> Result<Vec<InstanceInfo>, Error> {
    let instances_dir = state.config.lock().unwrap().instances_dir.clone();
    let instance_dirs: Vec<PathBuf> = WalkDir::new(&instances_dir)
        .into_iter()
        .filter_map(|e| match e {
            Ok(entry) => {
                if entry.path().is_dir()
                    && Uuid::parse_str(entry.file_name().to_str().unwrap()).is_ok()
                {
                    return Some(entry.path().to_path_buf());
                }
                return None;
            }
            Err(_) => return None,
        })
        .collect();

    let instances_info: Vec<InstanceInfo> = instance_dirs
        .into_iter()
        .filter_map(|e| {
            let instance_info = e.join("instance.json");
            if instance_info.exists() {
                let instance_info_string = match read_to_string(instance_info) {
                    Ok(info) => info,
                    Err(_) => return None,
                };

                let info: InstanceInfo = match serde_json::from_str(&instance_info_string) {
                    Ok(info) => info,
                    Err(_) => return None,
                };

                return Some(info);
            }
            None
        })
        .collect();

    Ok(instances_info)
}
