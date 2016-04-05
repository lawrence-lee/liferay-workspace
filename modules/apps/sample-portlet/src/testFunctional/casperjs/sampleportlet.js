var x = require('casper').selectXPath;
//var casper = require('casper').create();

casper.options.viewportSize = {width: 1600, height: 950};

casper.start('http://localhost:8080');

casper.then(function () {
    console.log('Signing In');
});

casper.thenClick(x('//span[contains(@class,"sign-in")]/a'), function () {
    this.sendKeys(x('//div[label[contains(.,"Email Address")]]/input[@type="text"]'), 'test@liferay.com');
    this.sendKeys(x('//div[label[contains(.,"Password")]]/input'),'test');
    this.wait(5000);

});

casper.thenClick(x('//button[contains(.,"Sign In")]'), function(){
	this.wait(5000);
    console.log('Signed in');
    casper.capture('ourImage.png');

});

casper.thenOpen('http://localhost:8080', function() {
//	this.mouseEvent('mouseover', 'x(//*[@data-qa-id="controlMenu"])');
	this.click(x('//*[@data-qa-id="controlMenu"]'));
    this.mouseEvent('mouseover', 'x(//*[@data-qa-id="controlMenu"]//*[@data-qa-id="add"])');
    this.click(x('//*[@data-qa-id="controlMenu"]//*[@data-qa-id="add"]'));
    this.wait(5000);
    this.sendKeys(x('//input[contains(@id,"searchApplication")]'), 'Sample JSP Portlet');
});


casper.run();