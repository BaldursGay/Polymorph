use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InstanceIndex {
    pub instances: Vec<InstanceInfo>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InstanceInfo {
    pub name: String,
    pub description: Option<String>,
    pub id: Uuid,
    pub order_index: i32,
}
