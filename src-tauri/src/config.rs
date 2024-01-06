use serde::{Deserialize, Serialize};
use std::{fs::read_to_string, path::PathBuf};
use tauri::{api::path::app_config_dir, Config, State};

use crate::{error, AppState};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppConfig {
    pub game_dir: Option<PathBuf>,
    pub instances_dir: PathBuf,
}

pub fn get_config(config_path: &PathBuf) -> Result<AppConfig, error::Error> {
    let config_string = read_to_string(&config_path)?;
    let new_config: AppConfig = toml::from_str(&config_string)?;
    Ok(new_config)
}

pub fn get_config_path() -> Result<PathBuf, error::Error> {
    let app_config_dir = app_config_dir(&Config::default())
        .unwrap()
        .join("com.lilydev.bg3mm");
    Ok(PathBuf::from(app_config_dir).join("config.toml"))
}

#[tauri::command]
pub fn get_config_file_json(state: State<AppState>) -> Result<AppConfig, error::Error> {
    Ok(state.config.lock().unwrap().clone())
}
