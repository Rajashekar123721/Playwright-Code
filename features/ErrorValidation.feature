Feature: Ecommerce Validations
    @Validation
    Scenario Outline: Placing the order successfully
        Given Login to the Ecommerce2 application with "<username>" and "<password>"
        Then Verify the error message "<error_message>" is displayed

        Examples:
            | username         | password    | error_message                |
            | shekar@gmail.com | Iamking@000 | Incorrect username/password. |
            | hello@123.com    | Hello@123   | Incorrect username/password. |

