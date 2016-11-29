'use strict';

const express = require('express');
//const datastore = require('./datastore');
const comprehension = require('../data/comprehension');

const router = express.Router();

// Set Content-Type for all responses for these ruotes
router.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    req.pg = {
        part: {
            stage: 'instruction'
        }
    };
    next();
});

/**
 * GET /:part
 *
 * Redirects to corresponding pages.
 */
router.get('/:part', (req, res, next) => {
    console.log(req.pg);
    if (req.pg.part.stage == 'instruction')
        res.redirect(`${req.baseUrl}/${req.params.part}/instruction`);
    else
        res.render('error.pug', {
            errorMsg: `Invalid stage: ${req.pg.part.stage}`
        });
});

/**
 * GET /:part/instruction
 *
 * Instructions of the experiment.
 */
router.get('/:part/instruction', (req, res, next) => {
    // TODO(ztz): make instruction extensible.
    res.render('parts/instruction_basic.pug');
});

/**
 * GET /:id/comprehension
 *
 * Shows a comprehension test
 */
router.get('/:part/comprehension', (req, res, next) => {
    res.render('parts/comprehension.pug', comprehension);
});

/**
 * POST /:id/comprehension
 *
 * Evaluates submitted answers
 */
router.post('/:part/comprehension', (req, res, next) => {
    // TODO(ztz): check the answer.
});

module.exports = router;