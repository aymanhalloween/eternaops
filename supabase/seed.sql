-- Insert sample retirement homes
INSERT INTO retirement_homes (name, contact_info) VALUES
('Sunset Manor', 'sarah.johnson@sunsetmanor.com'),
('Golden Years Community', 'm.chen@goldenyears.com'),
('Peaceful Gardens', 'lisa@peacefulgardens.org'),
('Harbor View Residence', 'david.kim@harborview.com'),
('Meadowbrook Manor', 'emily@meadowbrook.net');

-- Insert sample residents
INSERT INTO residents (name, background_notes, progress_status, home_id) VALUES
('Margaret Chen', 'Retired Stanford computer science professor, pioneered early AI research in the 1970s. Originally from Taiwan, immigrated to the US in 1965.', 'Active', 1),
('Robert Martinez', 'Former Apple engineer who worked on early iPhone development. Passionate about technology and innovation.', 'Active', 2),
('Eleanor Thompson', 'Retired nurse practitioner who worked in pediatrics for 40 years. Active in community volunteering.', 'Active', 3),
('James Wilson', 'Former Boeing aircraft engineer, worked on commercial aviation projects. Loves flying and model airplanes.', 'Active', 4),
('Dorothy Anderson', 'Retired elementary school teacher, taught for 35 years. Known for her creative teaching methods.', 'Active', 5),
('William Johnson', 'Former newspaper editor, covered major events in the 1960s-80s. Has extensive collection of historical photos.', 'Review', 1),
('Mary Rodriguez', 'Retired social worker, dedicated her career to helping families in crisis. Speaks three languages fluently.', 'Active', 2),
('Charles Davis', 'Former small business owner, ran a successful bakery for 30 years. Known for his award-winning sourdough bread.', 'Complete', 3),
('Patricia Miller', 'Retired librarian and local historian, authored several books about regional history.', 'Active', 4),
('Frank Thompson', 'Former firefighter and paramedic, served the community for 28 years. Has many heroic rescue stories.', 'Active', 5);

-- Insert sample interviews
INSERT INTO interviews (file_url, transcript_text, status, session_number, resident_id) VALUES
('https://example.com/margaret-session-1.mp3', 'Early childhood memories in Taiwan...', 'Transcribed', 1, 1),
('https://example.com/margaret-session-2.mp3', 'Journey to America and Stanford years...', 'Transcribed', 2, 1),
('https://example.com/robert-session-1.mp3', 'Early career at Apple...', 'Processing', 1, 2),
('https://example.com/eleanor-session-1.mp3', 'Nursing school and first job...', 'Transcribed', 1, 3),
('https://example.com/james-session-1.mp3', 'Boeing years and aircraft design...', 'Transcribed', 1, 4);

-- Insert sample chapters
INSERT INTO chapters (title, content, "order", status, word_count, resident_id, interview_id) VALUES
('Growing Up in Taiwan', '<h2>Early Years in Taipei</h2><p>I was born in Taipei in 1945...</p>', 1, 'Published', 2800, 1, 1),
('The Journey to America', '<h2>Crossing the Pacific</h2><p>In 1965, I made the difficult decision...</p>', 2, 'Review', 3200, 1, 2),
('Stanford and the Early Days of AI', '<h2>Graduate School</h2><p>Stanford in the 1970s was an exciting place...</p>', 3, 'Draft', 1900, 1, 2),
('From Nurse to Healer', '<h2>My Calling</h2><p>I knew from a young age that I wanted to help people...</p>', 1, 'Published', 2600, 3, 4),
('Wings and Dreams', '<h2>The Boeing Years</h2><p>Working at Boeing was like being part of aviation history...</p>', 1, 'Draft', 2200, 4, 5);

-- Insert sample exports
INSERT INTO exports (type, file_url, status, resident_id) VALUES
('book', 'https://example.com/margaret-chen-memoir.pdf', 'Completed', 1),
('podcast', 'https://example.com/eleanor-thompson-podcast.mp3', 'Processing', 3);

-- Note: team_assignments will be populated when we have actual auth users