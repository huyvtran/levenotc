<?php

namespace UserFrosting\Sprinkle\Web\Database\Models;

use UserFrosting\Sprinkle\Account\Database\Models\User;
use UserFrosting\Sprinkle\Core\Database\Models\Model;


class UserBalance extends Model
{
    //

    protected $table='user_balances';

    protected $fillable = [
         'user_id', 'coin_type', 'coin_name', 'lock_balance', 'pending_balance', 'total_balance'
    ];
}
