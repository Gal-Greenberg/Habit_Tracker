const fs = require('fs');
const path = require('path');

module.exports = function (router) {
    const routesPath = __dirname; // <-- התיקיה של הקובץ הזה: backend/src/routes

    console.log('Loading routes from:', routesPath);

    fs.readdirSync(routesPath).forEach((file) => {
        if (file === 'index.js' || path.extname(file) !== '.js') 
            return;

        const filePath = path.join(routesPath, file);
        const loaded = require(filePath);
        
        if (typeof loaded === 'function') {
            try {
                loaded(router);
                console.log(`Loaded route (as function): ${file}`);
            } catch (err) {
                console.warn(`Module ${file} is a function but failed when invoked.`, err);
            }
            return;
        }

        if (loaded && loaded.stack && Array.isArray(loaded.stack)) {
            const routeName = '/' + file.replace(/Routes?\.js$/i, '').replace('.js', '');
            router.use(routeName, loaded);
            console.log(`Loaded route (as router): ${file} -> ${routeName}`);
            return;
        }

        console.warn(`Skipping ${file} — exported value not recognized (function or express Router expected).`);
    });
};
