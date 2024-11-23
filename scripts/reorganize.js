const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

// New directory structure
const newStructure = {
  screens: {
    auth: ['Login.jsx', 'Register.jsx', 'Splash.jsx'],
    Dashboard: ['index.jsx'],
    Journal: ['index.jsx'],
    Portfolio: ['index.jsx'],
    Watchlist: ['index.jsx']
  },
  components: {
    charts: {
      files: ['TradingViewChart.jsx', 'TradingViewChart.web.jsx'],
      from: srcDir
    },
    market: {
      files: ['MarketData.jsx', 'MarketList.jsx', 'MarketOverview.jsx'],
      from: path.join(srcDir, 'components')
    },
    journal: {},
    portfolio: {},
    common: {
      files: ['BottomNav.jsx'],
      from: path.join(srcDir, 'components')
    }
  },
  services: {
    auth: {
      files: ['auth.service.js'],
      from: path.join(srcDir, 'auth', 'services')
    },
    market: {},
    files: ['appwrite.js']
  }
};

async function createDirectoryStructure() {
  console.log('Creating new directory structure...');
  
  // Create base directories
  for (const dir of Object.keys(newStructure)) {
    await fs.ensureDir(path.join(srcDir, dir));
  }

  // Create subdirectories and move files
  for (const [baseDir, content] of Object.entries(newStructure)) {
    const basePath = path.join(srcDir, baseDir);
    
    for (const [subDir, subContent] of Object.entries(content)) {
      if (subDir === 'files') {
        // Handle files in the base directory
        for (const file of subContent) {
          const sourcePath = path.join(content.from || srcDir, file);
          const targetPath = path.join(basePath, file);
          try {
            if (await fs.pathExists(sourcePath)) {
              await fs.move(sourcePath, targetPath, { overwrite: true });
              console.log(`Moved ${file} to ${baseDir}/`);
            } else {
              // Create empty file if it doesn't exist
              await fs.writeFile(targetPath, '');
              console.log(`Created empty file ${file} in ${baseDir}/`);
            }
          } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
          }
        }
        continue;
      }

      // Create subdirectory
      const subPath = path.join(basePath, subDir);
      await fs.ensureDir(subPath);

      // Handle files in subdirectory
      if (Array.isArray(subContent)) {
        for (const file of subContent) {
          const targetPath = path.join(subPath, file);
          try {
            // Create empty file if it doesn't exist
            if (!await fs.pathExists(targetPath)) {
              await fs.writeFile(targetPath, '');
              console.log(`Created empty file ${file} in ${baseDir}/${subDir}/`);
            }
          } catch (error) {
            console.error(`Error creating ${file}:`, error.message);
          }
        }
      } else if (subContent.files) {
        for (const file of subContent.files) {
          const sourcePath = path.join(subContent.from || srcDir, file);
          const targetPath = path.join(subPath, file);
          try {
            if (await fs.pathExists(sourcePath)) {
              await fs.move(sourcePath, targetPath, { overwrite: true });
              console.log(`Moved ${file} to ${baseDir}/${subDir}/`);
            }
          } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
          }
        }
      }
    }
  }
}

// Backup existing src directory
async function backupSrc() {
  const backupDir = path.join(__dirname, '..', 'src_backup_' + Date.now());
  console.log('Creating backup of src directory...');
  await fs.copy(srcDir, backupDir);
  console.log(`Backup created at ${backupDir}`);
}

// Main execution
async function main() {
  try {
    await backupSrc();
    await createDirectoryStructure();
    console.log('Reorganization complete!');
  } catch (error) {
    console.error('Error during reorganization:', error);
  }
}

main();
