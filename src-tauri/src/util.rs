use crate::error::Error;
use std::path::PathBuf;

#[tauri::command]
pub fn open_from_path(path: PathBuf) -> Result<(), Error> {
    Ok(open::that_detached(path)?)
}
