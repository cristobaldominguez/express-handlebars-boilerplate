-- psql -d db_name -a -f db/migrations/02_create_table_model_name.sql

DROP TABLE IF EXISTS model_name;
CREATE TABLE model_name(
  id SERIAL,

  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT TRUE,

  PRIMARY KEY (id)
);
