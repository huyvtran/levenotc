<?php
namespace UserFrosting\Sprinkle\Web\Database\Models;

use UserFrosting\Sprinkle\Core\Database\Models\Model;

class Navigation extends Model
{
    public $timestamps = true;

    /**
     * @var string The name of the table for the current model.
     */
    protected $table = "navigation";

    protected $fillable = [
        "user_id",
        "subscribed"
    ];


}
