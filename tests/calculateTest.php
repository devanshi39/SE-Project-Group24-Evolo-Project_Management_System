<?php

use PHPUnit\Framework\TestCase;
use App\calculate;

class calculateTest extends TestCase {
	public function testadd() {
		$calculate = new calculate;
		$calculate->setOperands([5,20]);
		$this->assertEquals(25, $calculate->add());
}
	//public function testsubtract()
		//$calculate = new calculate;
		//$calculate->setOperands([50,49]);
		//$this->assertEquals(1,$calculate->subtract());
	//}
}
?>