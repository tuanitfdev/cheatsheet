
public class Helper {
	private String name;
	
	public Helper(){
		name = "Test";
	}
	
	public Helper(String n){
		name = n;
	}
	
	public void showInfo(){
		System.out.print("Helper name: ");
		System.out.println(name);
	}
	
	public static void outputString(String o){
		System.out.println(o);
	}
	
	public static int Cong(int a, int b){
		return a + b;
	}
}
