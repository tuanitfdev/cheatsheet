
public class Class {

	public static void main(String[] args) {

		Helper h = new Helper();
//		Helper h = new Helper("Helper Name");
		h.showInfo();
		
		int res = Helper.Cong(10, 9);
		System.out.println("Result: " + res);
		Helper.outputString("Hello World!");
	}

}
