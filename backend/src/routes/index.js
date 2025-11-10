const fs = require('fs');
const path = require('path');
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');

module.exports = function (router) {
    const routesPath = __dirname;

    console.log('Loading routes from:', routesPath);

    fs.readdirSync(routesPath).forEach((file) => {
        if (file === 'index.js' || path.extname(file) !== '.js') 
            return;

        const filePath = path.join(routesPath, file);
        const loaded = require(filePath);
        
        try {
            console.log(filePath);
            
            const tempRouter = express.Router();
            loaded(router);

            if (file !== 'userRoutes.js') {
                tempRouter.use(authMiddleware);
            }
            
            router.loaded = tempRouter;

            console.log(router.stack.map(r => r.route?.path));
            console.log(`Loaded route (as function): ${file}`);
        } catch (err) {
            console.warn(`Module ${file} is a function but failed when invoked.`, err);
        }
    });
};
