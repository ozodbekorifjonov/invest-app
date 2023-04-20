<?php

namespace Tests\Unit\Api;

use App\Models\ProductType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use App\Console\Kernel;

class ProductTypeTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__ . '/../../../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        // Create sample currencies
        $productTypes = ProductType::factory()->count(3)->create();

        // Send a GET request to the /api/users endpoint
        $response = $this->getJson('/api/product-types');

        // Check if the response has a 200 status code
        $response->assertStatus(200);

        // Check if the response has the correct JSON structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);
    }
}
