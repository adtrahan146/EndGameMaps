

class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
    }
}

module.exports = new ServerControllers();