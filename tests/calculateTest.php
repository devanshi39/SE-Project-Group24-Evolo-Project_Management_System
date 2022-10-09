<?php

use PHPUnit\Framework\TestCase;

class calculateTest extends TestCase {
	public function testadd() {
		$this->assertEquals($this->calculate->add(1, 2), 3);

}
 
public function testsubtract() {
	$this->assertEquals($this->calculate->subtract(9, 7), 2);
}
}
?>