
public class DataTypeVariable {

	public static void main(String[] args) {

		
		/*
		 * byte <=> java.lang.Byte
		 * min value: -128
		 * max value: 127
		 * size: 8 bit
		 */
		// declare byte and assign value
		byte b = 125;
		System.out.println("byte b = " + b);

		/*
		 * short <=> java.lang.Short
		 * min value: -32768
		 * max value: 32767
		 * size: 16 bit
		 */
		// declare short and assign value
		short sh = 32000;
		System.out.println("short sh = " + sh);

		/*
		 * int <=> java.lang.Integer
		 * min value: -2147483648
		 * max value: 2147483647
		 * size: 32 bit
		 */
		// declare int and assign value
		int i = 20000000;
		System.out.println("int i = " + i);

		/*
		 * long <=> java.lang.Long
		 * min value: -9223372036854775808L
		 * max value: 9223372036854775807L
		 * size: 64 bit
		 */
		// declare long and assign value
		long l = 92338282939L;
		System.out.println("long l = " + l);

		/*
		 * float <=> java.lang.Float
		 * min value: 1.401298464324817E-45f
		 * max value: 3.4028234663852886E38f
		 * size: 32 bit
		 */
		// declare float and assign value
		float f = 1400.2592f;
		System.out.println("float f = " + f);

		/*
		 * double <=> java.lang.Double
		 * min value: 4.9E-324
		 * max value: 1.7976931348623157E308
		 * size: 64 bit
		 */
		// declare double and assign value
		double d = 1400002328.259332d;
		System.out.println("double d = " + d);
		
		/*
		 * when convert NUMERIC data type downward, it's called implicit convert and it's reliable.
		 * Example:
		 */
		// byte data type convert to int
		int i1 = b;
		System.out.println("int i = b (" + i1 + ")");

		// int data type convert to double
		double d1 = i;
		System.out.println("double d1 = i (" + d1 + ")");

		/*
		 * But when convert NUMERIC data type upward, it's called explicit convert and it can cause lose data
		 * Example:
		 */
		double j2 = 20.32d;
		System.out.println("double j2 = " + j2);
		// M1:
		int d3 = (int)j2; // must use (int) or it will throw error, and d3 will be 20
		System.out.println("M1: int d3 = (int) j2 = " + d3);
		
		// M2:
		Double j2_obj = new Double(j2);
		int d4 = j2_obj.intValue();
		System.out.println("M2: int d4 = (int) j2 = " + d4);

		/*
		 * char <=> java.lang.Character
		 * min value: 0
		 * max value: 65535
		 * size: 16 bit
		 */
		// declare char and assign value
		char c = 'z';
		System.out.println("char c = 'z'. Ouput c: " + c);
		
		char[] ch_arr = {'H','e','l','l','o'};
		String s = new String(ch_arr);
		System.out.println("M1: String s = new String(ch_arr) : s = " + s);
		String s1 = new String("Hello");
		System.out.println("M2: String s1 = new String(\"Hello\") : s1 = " + s1);
		String s2 = "Hello"; // String is complex object but can assign value like primitive variable (such as int)
		System.out.println("M3: String s2 = \"Hello\" : s2 = " + s2);

		/*
		 * Convert string to numeric data
		 */
		String s3 = "500";
		int i2 = Integer.parseInt(s3);
		System.out.println("L117: Output i2: " + i2);
		
		String s4 = "20.32d";
		double d5 = Double.parseDouble(s4);
		System.out.println("L121: Output d5: " + d5);
		
		

	}

}
