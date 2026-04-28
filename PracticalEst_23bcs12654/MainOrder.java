import java.util.*;

interface Payment{
    public void pay();

}

class UPI implements Payment{
    @Override
    public void pay(){
        System.out.println("Payment done via upi");

    }
}
class Card implements Payment{
    @Override
    public void pay(){
        System.out.println("Payment done via Card");
    }
}

interface Warehouse {
    boolean checkAvail();
}

class InStock implements Warehouse{
    int tcap=100;
    @Override
    public boolean checkAvail(){
        if(tcap>0)return true;
        else return false;
    }
}

interface MailService{
    public void sendReceite(String message);
}

class Mail implements MailService{
    @Override
    public void sendReceite(String s){
        System.out.println("Notification: " + s);
    }
}

class Order {
    private Payment payment;
    private Warehouse warehouse;
    private MailService mailService;
    
    public Order(Payment payment, Warehouse warehouse, MailService mailService) {
        this.payment = payment;
        this.warehouse = warehouse;
        this.mailService = mailService;
    }
    
    public void placeOrder(String orderId, String customerEmail) {
        System.out.println("\nOrder: " + orderId );
        
        if (warehouse.checkAvail()) {
            System.out.println("Item available");
            
            payment.pay();
            System.out.println("Payment processed");
            
            mailService.sendReceite("Order " + orderId + " confirmed");
            System.out.println("Receipt sent");
            
            System.out.println("Order placed successfully!");
        } else {
            System.out.println("Item out of stock. Order failed.");
        }
    }
}



public class MainOrder {
    public static void main(String []args){
        Payment upiPayment = new UPI();
        Payment cardPayment = new Card();
        Warehouse warehouse = new InStock();
        MailService mailService = new Mail();
        
        Order order1 = new Order(upiPayment, warehouse, mailService);
        Order order2 = new Order(cardPayment, warehouse, mailService);
        
        order1.placeOrder("O1", "cu1@email.com");
        order2.placeOrder("O2", "cu2@email.com");
    }
}