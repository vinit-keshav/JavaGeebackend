// File: Temp.java

public class Vinit {

    // Main method to run the program
    public static void main(String[] args) {
        // Create an instance of Temp
        Temp temp = new Temp();
        
        // Call the greet method
        temp.greet("World");
    }

    // Method to print a greeting message
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}
