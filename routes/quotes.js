const express = require('express');

let quotes = require('../public/data/quotesData');
const quotesRouter = express.Router();

quotesRouter.route('/')
    .get((req, res) => {

        let quoteArr = Array.from(quotes);
        let quote = quoteArr[Math.floor(Math.random() * quoteArr.length)]

        res.status(200).json({
            "quoteID" : quote[0],    
            'quote': quote[1]
        });
        
    })

    .post((req, res) => {

        let id = quotes.size;
        let bQuote = req.body.quote; 

        // Check if the quote is empty
        if(bQuote == undefined || bQuote == ""){
            res.status(400).json({
                "error": "Quote was not provided or was an empty string"
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

quotesRouter.route('/:id')
    .get((req, res) =>{
        let id = Number(req.params.id);
        let quote = quotes.get(id);
        if(quote == undefined){
            res.status(400).json({
                "error": "Invalid ID"
            })
            return ;
        }

        res.status(200).json({
            "quoteID" : id,    
            'quote': quote
        });
    })

    .put((req, res) => {
        let id = Number(req.params.id)
        let origianlQuote = quotes.get(id);
        let bQuote = req.body.quote;

        if(origianlQuote == undefined){
            res.status(400).json({
                "error": "Invalid ID"
            })
            return ;
        }

        if(bQuote == undefined  || bQuote == ""){
            res.status(400).json({
                "error": "Quote was not provided or was an empty string"
            })
            return ;
        }

        quotes.set(id, bQuote)
        res.status(200).json({
            "msg" : "Successfully Edited Quote",
            'quoteID' : id,
            'quote': quotes.get(id)
        })        
    })

    .delete((req, res) => {
        
        let id = Number(req.params.id)
        let quote = quotes.get(id);

        if(quote == undefined){
            res.status(400).json({
                "error": "Invalid ID"
            })
            return ;
        }

        quotes.delete(id);
        if(quotes.get(id) == undefined){
            res.status(200).json({
                "msg" : "Successfully Deleted Quote",
            }) 
        }
        else{
            res.status(500).json({
                "error" : "Quote was not deleted. Please try again."
            })
        }

    })

module.exports = quotesRouter;