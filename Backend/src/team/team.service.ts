import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamService {
  constructor (private readonly db: PrismaService) {}

  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  
  async findOne(id: number) {

    const team = await this.db.team.findUnique({
      where: {
        teamID: id
      }
    })

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }
  
  async addPlayerToTeam(teamID: number, playerID: number) {
    const team = await this.db.team.findUnique({where: {teamID: teamID}});
    const player = await this.db.player.findUnique({where: {PlayerID: playerID}});
    if (!team || !player) {
      throw new NotFoundException(`Team or player not found`);
    }
    
    return this.db.team.update({
      where: {teamID: teamID},
      data: {
        players: {
          connect: {
            PlayerID: playerID
          } 
        }
      }
    });
  }


  async findAll(includePlayers: boolean) {
    if (includePlayers) {
      return this.db.team.findMany({
        include: {
          players: true, 
        },
      });
    } else {
      return this.db.team.findMany({
      });
    }
  }
  
  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
