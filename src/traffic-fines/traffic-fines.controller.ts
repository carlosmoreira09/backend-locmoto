import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTrafficFineDto } from './dto/create-traffic-fine.dto';
import { TrafficFineService } from './traffic-fines.service';

@Controller('traffic-fines')
export class TrafficFineController {
  constructor(private readonly trafficFineService: TrafficFineService) {}

  @Post()
  async create(@Body() createTrafficFineDto: CreateTrafficFineDto) {
    try {
      const trafficFine =
        await this.trafficFineService.create(createTrafficFineDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Traffic fine created successfully',
        data: trafficFine,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create traffic fine:' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const trafficFines = await this.trafficFineService.findAll();
      return {
        status: HttpStatus.OK,
        data: trafficFines,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch traffic fines: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Traffic fine ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const trafficFine = await this.trafficFineService.findOne(+id);
      return {
        status: HttpStatus.OK,
        data: trafficFine,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch traffic fine: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrafficFineDto: Partial<CreateTrafficFineDto>,
  ) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Traffic fine ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const trafficFine = await this.trafficFineService.update(
        +id,
        updateTrafficFineDto,
      );
      return {
        status: HttpStatus.OK,
        message: 'Traffic fine updated successfully',
        data: trafficFine,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to update traffic fine: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Traffic fine ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.trafficFineService.remove(+id);
      return {
        status: HttpStatus.OK,
        message: 'Traffic fine deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to delete traffic fine: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
