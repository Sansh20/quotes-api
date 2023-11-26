const express = require('express');

let quotes = require('../public/data/quotesData');
const quotesRouter = express.Router();

quotesRouter.route('/')
    .get((req, res, next) => {
        let randIdx = Math.floor(Math.random() * (quotes.size-1));
        res.status(200).json({
            "quoteID" : randIdx,    
            'quote': quotes.get(randIdx)
        });
    })

    .post((req, res, next) => {
        let id = quotes.size

        // Check if the quote is empty
        if(req.body.quote == undefined || req.body.quote == ""){
            res.status(400).json({
                "status" : "fail",
                "error": "Invalid Quote"
            });
            return ;
        }

        // Check if the quote already exists
        for(let [k, v] of quotes){
            if(v.toLowerCase() === req.body.quote.toLowerCase()){
                res.status(400).json({
                    "status" : "fail",
                    "error": "Quote Already Exists, id: " + k
                })
                return ;
            }
        }

        quotes.set(id, req.body.quote)
        res.status(200).json({
            "status" : "success",
            'quoteID' : id,    
            'quote': quotes.get(id)
        })
    
    })

module.exports = quotesRouter;