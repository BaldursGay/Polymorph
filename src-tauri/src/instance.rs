use std::{fs::read_to_string, path::PathBuf};

use tauri::State;

use crate::{error::Error, models::instance::InstanceIndex, AppState};

#[tauri::command]
pub fn get_instances_index(state: State<AppState>) -> Result<InstanceIndex, Error> {
    Ok(state.instance_index.lock().unwrap().clone())
}

#[tauri::command]
pub fn refresh_instances_index(state: State<AppState>) -> Result<(), Error> {
    let new_index = get_instances_index_from_path(
        &state
            .config
            .lock()
            .unwrap()
            .instances_dir
            .join("instances.index.json"),
    )?;

    let mut index_lock = state.instance_index.lock().unwrap();
    index_lock.instances = new_index.instances;

    Ok(())
}

pub fn get_instances_index_from_path(path: &PathBuf) -> Result<InstanceIndex, Error> {
    let index_string = read_to_string(&path)?;
    let index: InstanceIndex = serde_json::from_str(&index_string)?;

    Ok(index)
}
