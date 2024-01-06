#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
    #[error("TOML serializing error")]
    TomlSerialize(#[from] toml::ser::Error),
    #[error("TOML deserializing error")]
    TomlDeserialize(#[from] toml::de::Error),
    #[error("Tauri built-in directory error")]
    TauriDirectory,
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
