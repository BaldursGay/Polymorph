use crate::error::Error;
use std::{fs::metadata, path::PathBuf};

pub fn is_path_writable(path: &PathBuf) -> Result<bool, Error> {
    let path_meta = metadata(path)?;
    Ok(!path_meta.permissions().readonly())
}

#[tauri::command]
pub fn open_from_path(path: PathBuf) -> Result<(), Error> {
    Ok(open::that_detached(path)?)
}
