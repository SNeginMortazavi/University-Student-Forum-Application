const router = require('express').Router();

const algoliasearch = require('algoliasearch');
//(apID, API Key)
const client = algoliasearch('RV2HO6Y1IJ', '05312da8e017fd87d7e36f4d370cefae');
//name of the index that we want to search inside
const saleIndex = client.initIndex('web_development_sale_search');


router.get('/sale', function(req, res, next) {
    if (req.query.query) {
        saleIndex.search({   //search inside the index which is our index web_development_project_student_forum
            query: req.query.query,
            page: req.query.page,
        }, function(err, content) {
            res.json({
                success: true,
                message: "Your search is:",
                status: 200,
                content: content,
                search_result: req.query.query
            });
        });
    }
});


module.exports = router;

