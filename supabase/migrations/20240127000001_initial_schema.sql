-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create retirement_homes table
CREATE TABLE retirement_homes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create residents table
CREATE TABLE residents (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    background_notes TEXT,
    progress_status TEXT DEFAULT 'Active',
    home_id INTEGER REFERENCES retirement_homes(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interviews table
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    file_url TEXT,
    transcript_text TEXT,
    status TEXT DEFAULT 'Pending',
    session_number INTEGER,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resident_id INTEGER REFERENCES residents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chapters table
CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    "order" INTEGER NOT NULL,
    status TEXT DEFAULT 'Draft',
    word_count INTEGER,
    resident_id INTEGER REFERENCES residents(id),
    interview_id INTEGER REFERENCES interviews(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chapter_versions table
CREATE TABLE chapter_versions (
    id SERIAL PRIMARY KEY,
    diff TEXT,
    notes TEXT,
    chapter_id INTEGER REFERENCES chapters(id),
    editor_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exports table
CREATE TABLE exports (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL, -- 'book', 'podcast', 'newsletter'
    file_url TEXT NOT NULL,
    status TEXT DEFAULT 'Processing',
    resident_id INTEGER REFERENCES residents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_assignments table
CREATE TABLE team_assignments (
    id SERIAL PRIMARY KEY,
    storyteller_id UUID REFERENCES auth.users(id),
    writer_id UUID REFERENCES auth.users(id),
    editor_id UUID REFERENCES auth.users(id),
    resident_id INTEGER REFERENCES residents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE retirement_homes ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read retirement_homes" ON retirement_homes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read residents" ON residents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read interviews" ON interviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read chapters" ON chapters FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read chapter_versions" ON chapter_versions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read exports" ON exports FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to read team_assignments" ON team_assignments FOR SELECT TO authenticated USING (true);

-- Create update/insert policies for authenticated users
CREATE POLICY "Allow authenticated users to insert/update retirement_homes" ON retirement_homes FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert/update residents" ON residents FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert/update interviews" ON interviews FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert/update chapters" ON chapters FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert/update chapter_versions" ON chapter_versions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert/update exports" ON exports FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert/update team_assignments" ON team_assignments FOR ALL TO authenticated USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_retirement_homes_updated_at BEFORE UPDATE ON retirement_homes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_residents_updated_at BEFORE UPDATE ON residents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interviews_updated_at BEFORE UPDATE ON interviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_assignments_updated_at BEFORE UPDATE ON team_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();