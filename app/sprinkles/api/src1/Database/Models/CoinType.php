<?php

namespace UserFrosting\Sprinkle\Web\Database\Models;

use UserFrosting\Sprinkle\Account\Database\Models\User;
use UserFrosting\Sprinkle\Core\Database\Models\Model;


class CoinType extends Model
{


    const TABLE = 'coin_type';

    /**
     * {@inheritdoc}
     */
    protected $table = self::TABLE;

    protected $vote = User::class;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'label', 'name'
    ];

}
