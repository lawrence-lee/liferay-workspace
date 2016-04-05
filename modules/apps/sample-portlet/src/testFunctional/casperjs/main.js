#!/usr/bin/env casperjs

var casper = require('casper').create(
    {
        verbose: true,
        viewportSize: {
            height: 1024,
            width: 1280
        }
    }
);

var Login = require('../../modules/login').Login;

var loginInstance = new Login(
        {
            portletNamespace: '_58_'
        }
    );

casper.start(
    'http://localhost:8080',
    function() {
        casper.echo('Liferay UI Framework Test suite is running');

        casper.echo('Page URL is: ' + casper.getCurrentUrl());

        casper.echo('Page title is: ' + casper.evaluate(function() {
            return document.title;
        }), 'INFO');
    }
);

casper.then(
    function testLogin() {
        casper.captureSelector('snapshots/before_login.png', '.yui3-skin-sam');

        loginInstance.signIn(casper.cli.get('u') || 'test@liferay.com', casper.cli.get('p') || 'test', false);

        casper.captureSelector('snapshots/logged.png', '.yui3-skin-sam');
    }
);

casper.then(
    function testLogout() {
        casper.echo('Login out');

        loginInstance.signOut();

        casper.captureSelector('snapshots/logged_out.png', '.yui3-skin-sam');
    }
);

casper.run(
    function() {
        casper.echo('Done.');

        casper.test.renderResults(true, 0, 'test-results.xml');
    }
);