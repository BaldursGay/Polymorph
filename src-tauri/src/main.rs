// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::config::{get_config, get_config_file_json, get_config_path, AppConfig};
use std::{fs::File, io::prelude::*};
use tauri::{api::path::app_data_dir, Config};

mod config;
mod error;

fn main() -> Result<(), error::Error> {
    let config_path = get_config_path()?;

    let instances_dir = match app_data_dir(&Config::default()) {
        Some(dir) => dir,
        None => return Err(error::Error::TauriDirectory),
    }
    .join("com.lilydev.bg3mm")
    .join("instances");

    let mut config: Option<AppConfig> = None;

    if !config_path.exists() {
        if !&instances_dir.exists() {
            match std::fs::create_dir_all(&instances_dir) {
                std::io::Result::Ok(_) => println!("Successfully created instances directory"),
                Err(err) => return Err(error::Error::Io(err)),
            }
        }

        config = Some(AppConfig {
            game_dir: None,
            instances_dir: instances_dir,
        });

        let mut config_file = File::create(&config_path)?;

        config_file.write_all(toml::to_string_pretty(&config)?.as_bytes())?;
    } else {
        config = Some(get_config(&config_path)?);
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_config_file_json])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
