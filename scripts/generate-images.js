const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'images-data.json');

try {
  console.log('Scanning images folder: ', IMAGES_DIR);
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory does not exist!');
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const images = [];

  // Sort files for consistent ordering
  files.sort();

  let buildingCount = 0;
  let roomCount = 0;
  let diningCount = 0;
  let labeCount = 0;
  let commonCount = 0;

  files.forEach((file) => {
    // Only process common image formats
    if (!/\.(jpe?g|png|webp|gif|svg)$/i.test(file)) {
      return;
    }

    const filename = path.basename(file);
    const src = `/images/${filename}`;
    let category = 'facility';
    let title = 'Facility';

    if (filename.toLowerCase().startsWith('building')) {
      buildingCount++;
      category = 'exterior';
      title = buildingCount === 1 ? 'Building Front View' : `Building Entrance & Exterior`;
    } else if (filename.toLowerCase().startsWith('room')) {
      roomCount++;
      category = 'room';
      // Give descriptive names based on standard categories
      if (roomCount === 1) title = 'Single Occupancy Room';
      else if (roomCount === 2) title = 'Premium Single Room';
      else if (roomCount === 3) title = 'Double Sharing Room';
      else if (roomCount === 4) title = 'Deluxe Double Room';
      else if (roomCount === 5) title = 'Furnished AC Room';
      else if (roomCount === 6) title = 'Study & Bedroom Setup';
      else title = `Co-living Room Interior`;
    } else if (filename.toLowerCase().startsWith('dinner_area')) {
      diningCount++;
      category = 'facility';
      title = diningCount === 1 ? 'Dining Area Layout' : `Mess & Dining Facility`;
    } else if (filename.toLowerCase().startsWith('common')) {
      commonCount++;
      category = 'facility';
      title = 'Common Lobby / Refrigerator Area';
    } else if (filename.toLowerCase().startsWith('labe')) {
      labeCount++;
      category = 'facility';
      if (labeCount === 1) title = 'Study Lounge';
      else if (labeCount === 2) title = 'Storage Cupboards & Lockers';
      else if (labeCount === 3) title = 'Lobby Entrance';
      else if (labeCount === 4) title = 'Washing Machine Area';
      else title = `Property Amenities`;
    }

    images.push({
      src,
      category,
      title,
      filename
    });
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(images, null, 2));
  console.log(`Successfully generated ${images.length} image mappings inside ${OUTPUT_FILE}`);
} catch (error) {
  console.error('Error scanning images directory:', error);
  process.exit(1);
}
