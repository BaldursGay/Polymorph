#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
    #[error("TOML serializing error")]
    TomlSerialize(#[from] toml::ser::Error),
    #[error("TOML deserializing error")]
    TomlDeserialize(#[from] toml::de::Error),
    #[error("serde JSON error: {0}")]
    SerdeJson(#[from] serde_json::Error),
    #[error("Tauri built-in directory error")]
    TauriDirectory,
    #[error("Path error: {0}")]
    PathError(#[from] PathError),
    #[error("Other error: {0}")]
    Other(#[from] anyhow::Error),
    #[error("Unknown error")]
    Unknown,
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[derive(Debug, thiserror::Error)]
pub enum PathError {
    #[error("Failed to auto-detect path")]
    AutoDetect,
    #[error("Path not writable: {0}")]
    NotWritable(String),
}
