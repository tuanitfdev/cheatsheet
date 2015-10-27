
public class Bo extends DongVat {
	
	public Bo() {
		System.out.println("Khoi tao lop Bo!");
	}
	
	public Bo(boolean laDuc) {
		if (laDuc == true) {
			System.out.println("Khoi tao lop Bo Duc!");
		} else {
			System.out.println("Khoi tao lop Bo Cai!");
		}
	}

	public void An() {
//		 super.An(); 
		System.out.println("Bo an!");
	}

}
