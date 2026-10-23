-- ============================================================================
-- THEBESTBRAND — NEON POSTGRESQL PRODUCTION SCHEMA
-- Database: neondb
-- Project: TheBestBrand (green-cherry-54371329)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS & LICENSES
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    tier VARCHAR(50) DEFAULT 'explorer' CHECK (tier IN ('explorer', 'master', 'enterprise')),
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROJECTS (BRAND ATELIER SESSIONS)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_token VARCHAR(255) UNIQUE,
    brand_name VARCHAR(255) DEFAULT 'Mi Marca',
    industry VARCHAR(100) DEFAULT 'comercio_local',
    current_step INTEGER DEFAULT 1,
    status VARCHAR(50) DEFAULT 'in_progress',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. BRAND MANIFESTOS (STEP 1 & STEP 2)
CREATE TABLE IF NOT EXISTS brand_manifestos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    dimensions JSONB DEFAULT '{}'::jsonb,
    customer_journey JSONB DEFAULT '{}'::jsonb,
    raw_socratic_notes JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. NAMING CANDIDATES (STEP 3)
CREATE TABLE IF NOT EXISTS naming_candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    style VARCHAR(50),
    smile_score NUMERIC(3,1) DEFAULT 0.0,
    scratch_risk VARCHAR(50) DEFAULT 'Bajo',
    nice_classes JSONB DEFAULT '[]'::jsonb,
    is_selected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. SENSORY PREFERENCES & TOURNAMENT (STEP 4 & STEP 5)
CREATE TABLE IF NOT EXISTS sensory_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    osgood_vector JSONB DEFAULT '{}'::jsonb,
    tournament_votes JSONB DEFAULT '[]'::jsonb,
    selected_logo_id VARCHAR(100),
    selected_palette_id VARCHAR(100),
    selected_typography_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. COMPILED BRANDBOOKS (STEP 6)
CREATE TABLE IF NOT EXISTS compiled_brandbooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    brandbook_version VARCHAR(20) DEFAULT '1.0',
    master_spec_json JSONB NOT NULL,
    pdf_storage_url TEXT,
    svg_pack_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_session_token ON projects(session_token);
CREATE INDEX IF NOT EXISTS idx_manifestos_project_id ON brand_manifestos(project_id);
CREATE INDEX IF NOT EXISTS idx_naming_project_id ON naming_candidates(project_id);
CREATE INDEX IF NOT EXISTS idx_sensory_project_id ON sensory_preferences(project_id);
CREATE INDEX IF NOT EXISTS idx_brandbooks_project_id ON compiled_brandbooks(project_id);
