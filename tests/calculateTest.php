<?php

use PHPUnit\Framework\TestCase;

class calculateTest extends TestCase {
	public function testadd() {
		$calculate = new code/calculate;
		$calculate->setOperands([5,20]);
		$this->assertEquals(25, $calculate->add());
}
	public function testsubtract() {
		$calculate = new code/calculate;
		$calculate->setOperands([50,49]);
		$this->assertEquals(1,$calculate->subtract());
	}
}
?>