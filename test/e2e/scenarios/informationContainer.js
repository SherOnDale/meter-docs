describe("render informationContainer", function () {
    let mainPage
    let informationContainer
    beforeEach(function (client, done) {

        mainPage = client
        .url(client.globals.baseAppUrl)
        .page.main()
        client.waitForElementVisible(".download-url-input", client.globals.visibleTimeout || 5000)
        .pause(client.globals.visibleTimeout || 5000)
        .clearValue(".download-url-input")
        .setValue(".download-url-input", client.globals.specPath)
        .click("button.download-url-button")
        .pause(1000)

        informationContainer = mainPage.section.informationContainer

        done()
    })

    it("renders section", function (client) {
        mainPage.expect.section("@informationContainer").to.be.visible.before(client.globals.visibleTimeout || 5000)

        client.end()
    })

    it("renders content", function (client) {
        informationContainer.waitForElementVisible("@title", client.globals.visibleTimeout || 5000)
            .assert.containsText("@title", "Swagger Petstore")
            .assert.containsText("@version", "1.0.0")
            .assert.containsText("@baseAppUrl", "[ Base URL: localhost:3204/ ]")
            .assert.attributeEquals("@mainUrl", "href", client.globals.specPath)
            .assert.containsText("@mainUrlContent", client.globals.specPath)
            .assert.containsText("@description", "This is a sample server Petstore server. You can find out more about Swagger at http://swagger.io or on irc.freenode.net, #swagger. For this sample, you can use the api key special-key to test the authorization filters.")
            .assert.attributeEquals("@swaggerUrl", "href", "http://swagger.io/")
            .assert.attributeEquals("@swaggerircUrl", "href", "http://swagger.io/irc/")
            .assert.attributeEquals("@termsLink", "href", "http://swagger.io/terms/")
            .assert.containsText("@termsLink", "Terms of service")
            .assert.attributeEquals("@contactDevLink", "href", "mailto:apiteam@swagger.io")
            .assert.containsText("@contactDevLink", "Contact the developer")
            .assert.attributeEquals("@contactDevLink", "href", "mailto:apiteam@swagger.io")
            .assert.containsText("@contactDevLink", "Contact the developer")
            .assert.attributeEquals("@aboutSwaggerLink", "href", "http://swagger.io/")
            .assert.containsText("@aboutSwaggerLink", "Find out more about Swagger")

        client.end()
    })
})
