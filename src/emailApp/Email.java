package emailApp;

import java.util.Locale;
import java.util.Scanner;

public class Email {
    // properties
    private String firstName; // we use Encapsulation we don't want the people to actually access it directly so we're gonna make these all (private)
    private String lastName;
    private String password;
    private String department;
    private String email;
    private int mailBoxCapacity = 500;
    private int defaultPasswordLength = 8;
    private String alternativeEmail;
    private String companySuffix = "amazon.com";

    // Constructor to receive the first name and last name
    public Email(String firstName, String lastName) {
        this.firstName = firstName; // This is the class level right (this) refers to the class level variable.
        // => (passed through the parameter through the arguments).
        this.lastName = lastName;
        // System.out.println("Email created successfully: " + this.firstName + " " + this.lastName);

        // Call a method asking for the department - return the department
        this.department = setDepartment();
        // System.out.println("Department Created: " + this.department);

        // Call a method that returns a random password
        this.password = randomPassword(defaultPasswordLength);
        System.out.println("Your Password is: " + this.password);

        // Combine elements to generate email
        email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@" + department + "." + companySuffix;
        // System.out.println("Your Email is: " + email);


    }

    // Ask for the department
    private String setDepartment() {
        System.out.println("Department Codes\n 1 for Sales\n 2 for Development\n 3 for Accounting\n 0 for None\n Enter the Department Code: ");
        Scanner in = new Scanner(System.in); // Entering the Information from the keyboard by choosing from above options.
        int depChoice = in.nextInt();
        if (depChoice == 1) {    // checking the condition, user entered from the option Ex:1, 2, 3 (Based on the Department selected condition checked)
            return "Sales";
        } else if (depChoice == 2) {
            return "Development";
        } else if (depChoice == 3) {
            return "Accounting";
        } else {
            return "None";
        }
    }


    // Generate a random password
    private String randomPassword(int length) {
        String passwordSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$&%";
        char[] password = new char[length];
        for (int i = 0; i<length; i++) {
            int rand = (int) (Math.random() * passwordSet.length());
            password[i] = passwordSet.charAt(rand);
            // System.out.println(rand);
            // System.out.println(passwordSet.charAt(rand));
        }
        return new String(password);
    }


    // Set the mailbox capacity
    public void setMailBoxCapacity(int capacity) {
        this.mailBoxCapacity = capacity;
    }


    // Set the alternate email
    public void setAlternativeEmail(String altEmail){
        this.alternativeEmail = altEmail;
    }


    // Change the password
    public void changePassword(String password) {
        this.password = password;
    }

    public int getMailBoxCapacity() {
        return mailBoxCapacity;
    }

    public String getAlternativeEmail() {
        return alternativeEmail;
    }

    public String getPassword() {
        return password;
    }

    public String showInfo() {
        return "DISPLAY NAME: " +  firstName + " " + lastName +
                "\nCOMPANY EMAIL: " + email +
                "\nMAILBOX CAPACITY: " + mailBoxCapacity + "mb";
    }


}
