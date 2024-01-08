use crate::{
    config::write_config,
    error::{Error, PathError},
    AppState,
};
use os_info::Type;
use std::path::PathBuf;
use tauri::State;

#[tauri::command]
pub fn autodetect_game_folder(state: State<AppState>) -> Result<(), Error> {
    match detect_game_folder() {
        Ok(path) => {
            let mut app_config_lock = state.config.lock().unwrap();
            app_config_lock.game_dir = Some(path);

            let app_config = app_config_lock.clone();

            write_config(app_config)?;

            Ok(())
        }
        Err(err) => return Err(Error::PathError(err)),
    }
}

pub fn detect_game_folder() -> Result<PathBuf, PathError> {
    let os_type = os_info::get().os_type();

    let default_paths: Vec<PathBuf> = if os_type == Type::Windows {
        vec![PathBuf::from(
            r#"C:\Program Files (x86)\Steam\steamapps\common\Baldurs Gate 3"#,
        )]
    } else if os_type == Type::Macos {
        vec![]
    } else if os_type == Type::Linux {
        vec![]
    } else {
        vec![]
    };

    for path in default_paths {
        if path.exists() {
            return Ok(path);
        } else {
            continue;
        }
    }

    Err(PathError::AutoDetect)
}
