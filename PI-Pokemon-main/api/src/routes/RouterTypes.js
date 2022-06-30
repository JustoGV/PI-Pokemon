const { Router } = require('express');
const { TypeDbInfo } = require('./functions');
const router = Router();

router.get('',async(req,res)=>{
    const allTypes=await TypeDbInfo()
    res.send(allTypes)
})





module.exports = router;