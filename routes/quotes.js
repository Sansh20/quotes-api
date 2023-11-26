const express = require('express');

let quotes = require('../public/data/quotesData');
const quotesRouter = express.Router();

quotesRouter.route('/')
    .get((req, res) => {
        let randIdx = Math.floor(Math.random() * (quotes.size-1));
        res.status(200).json({
            "quoteID" : randIdx,    
            'quote': quotes.get(randIdx)
        });
    })

    .post((req, res) => {

        let id = quotes.size;
        let bQuote = req.body.quote; 

        // Check if the quote is empty
        if(bQuote == undefined || bQuote == ""){
            res.status(400).json({
                "error": "Invalid Quote"
            });
            return ;
        }

        // Check if the quote already exists
        for(let [k, v] of quotes){
            if(v.toLowerCase() === bQuote.toLowerCase()){
                res.status(400).json({
                    "error": "Quote Already Exists, id: " + k
                })
                return ;
            }
        }

        quotes.set(id, bQuote)
        res.status(200).json({
            "msg" : "Successfully Added Quote",
            'quoteID' : id,    
            'quote': quotes.get(id)
        })
    
    })

module.exports = quotesRouter;