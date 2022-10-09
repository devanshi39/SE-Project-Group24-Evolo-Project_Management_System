<?php
namespace App;

class calculate {
	private $operands;
	public function setOperands(array $operands)
   {
    $this->operands = $operands;
   }
	public function add() {
		return array_sum($this->operands);
	}
}
