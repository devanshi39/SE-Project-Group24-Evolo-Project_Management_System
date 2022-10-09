<?php

use PHPUnit\Framework\TestCase;

class calculateTest extends TestCase {
	public function testadd() {
		$calculate->setOperands([5,20]);
		$this->assertEquals(25, $calculate->add());

}
	public function testsubtract() {
		$this->assertEquals($this->calculate->subtract(9, 7), 2);
	}
}
?>