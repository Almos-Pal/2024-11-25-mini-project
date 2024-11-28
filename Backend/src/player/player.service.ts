import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly db: PrismaService) {}
  
  async create(createPlayerDto: CreatePlayerDto) {
    const { name, goalCount, birthDate } = createPlayerDto;
  
    return this.db.player.create({
      data: {
        name,
        goalCount,
        birthDate: new Date(birthDate), 
      },
    });
  }

  findAll() {
    return this.db.player.findMany();
  }

  async findOne(id: number) {
    const player = await this.db.player.findUnique({
      where: { PlayerID: id },
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  async remove(id: number) {
    const player = await this.db.player.findUnique({where: { PlayerID: id }});

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    else {
      return this.db.player.delete({
        where: 
          { PlayerID: id }
      })
    }

  
  }
}
