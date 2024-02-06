use serde::{Deserialize, Serialize};
use std::{
    fs::{read_to_string, File},
    io::prelude::*,
    path::PathBuf,
};
use tauri::{api::path::app_config_dir, Config, State};

use crate::{
    error::{Error, PathError},
    util::is_path_writable,
    AppState,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppConfig {
    pub game_dir: Option<PathBuf>,
    pub instances_dir: PathBuf,
}

pub fn get_config(config_path: &PathBuf) -> Result<AppConfig, Error> {
    let config_string = read_to_string(config_path)?;
    let new_config: AppConfig = toml::from_str(&config_string)?;
    Ok(new_config)
}

pub fn get_config_path() -> Result<PathBuf, Error> {
    let app_config_dir = app_config_dir(&Config::default())
        .unwrap()
        .join("com.lilydev.polymorph");
    Ok(app_config_dir.join("config.toml"))
}

pub fn write_config(config: AppConfig) -> Result<(), Error> {
    let config_path = get_config_path()?;
    let mut config_file = File::create(&config_path)?;
    config_file.write_all(toml::to_string_pretty(&config)?.as_bytes())?;
    Ok(())
}

#[tauri::command]
pub fn get_config_file_json(state: State<AppState>) -> Result<AppConfig, Error> {
    Ok(state.config.lock().unwrap().clone())
}

#[tauri::command]
pub fn set_game_directory(state: State<AppState>, path: PathBuf) -> Result<(), Error> {
    if is_path_writable(&path)? {
        let mut app_config_lock = state.config.lock().unwrap();
        app_config_lock.game_dir = Some(path);

        let app_config = app_config_lock.clone();

        write_config(app_config)?;

        return Ok(());
    }
    Err(Error::PathError(PathError::NotWritable(format!(
        "Path `{}` not writable",
        path.to_str().unwrap()
    ))))
}

#[tauri::command]
pub fn set_instances_directory(state: State<AppState>, path: PathBuf) -> Result<(), Error> {
    if is_path_writable(&path)? {
        let mut app_config_lock = state.config.lock().unwrap();
        app_config_lock.instances_dir = path;

        let app_config = app_config_lock.clone();

        write_config(app_config)?;

        return Ok(());
    }
    Err(Error::PathError(PathError::NotWritable(format!(
        "Path `{}` not writable",
        path.to_str().unwrap()
    ))))
}
