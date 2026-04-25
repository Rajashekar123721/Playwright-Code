Feature: Ecommerce Validations
    @Regression
    Scenario: Placing the order successfully
        Given Login to the application with "shekar@gmail.com" and "Iamking@000"
        When Add "ZARA COAT 3" to the cart and checkout
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and Place the order
        Then Verify the order is present in the order history.



    @Validation
    Scenario Outline: Placing the order successfully
        Given Login to the Ecommerce2 application with "<username>" and "<password>"
        Then Verify the error message "<error_message>" is displayed

        Examples:
            | username         | password    | error_message                |
            | shekar@gmail.com | Iamking@000 | Incorrect username/password. |
            | hello@123.com    | Hello@123   | Incorrect username/password. |