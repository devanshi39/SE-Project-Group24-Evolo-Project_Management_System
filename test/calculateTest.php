<?php

use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase {
	public function testadd() {
		$this->assertEquals($this->Calculator->add(1, 2), 3);

}
 
public function testsubtract() {
	$this->assertEquals($this->Calculator->subtract(9, 7), 2);
}
}
?>