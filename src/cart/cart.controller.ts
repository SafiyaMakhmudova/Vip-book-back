import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './models/cart.model';

@ApiTags("Cart")
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create Cart' })
  @ApiResponse({
    status: 201,
    type: Cart,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: 'View all Cart' })
  @ApiResponse({
    status: 200,
    description: 'List of Cart',
    type: [Cart],
  })
  @Get('all')
  findAll() {
    return this.cartService.findAll();
  }


  @ApiOperation({summary:'update by id'})
  @ApiResponse({status:202, type:[Cart]})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  
  @ApiOperation({summary:'delete by id'})
  @ApiResponse({status:200, type:Number})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
