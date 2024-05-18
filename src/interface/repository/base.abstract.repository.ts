import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseModel } from './base.model';

export abstract class BaseRepository<T extends BaseModel> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private baseLogger: Logger = new Logger(BaseRepository.name, {
    timestamp: true,
  });

  protected constructor(private readonly model: Model<T>) {}

  public async create(doc: any): Promise<any> {
    // this.baseLogger.debug('BaseRepo: Entity is being created...');
    // eslint-disable-next-line new-cap
    return new this.model(doc);
  }

  public async findById(id: string): Promise<T> {
    // this.baseLogger.debug('BaseRepo: Entity is being found by id...');
    return this.model.findById(id);
  }

  public async findAll(): Promise<T[]> {
    // this.baseLogger.debug('BaseRepo: Entities are being found...');
    return this.model.find();
  }

  public async findOne(filter: any, projections?: any): Promise<T> {
    // this.baseLogger.debug('BaseRepo: Entities are being found by findOne...');
    return this.model.findOne(filter, projections);
  }

  public async find(options: any) {
    return this.model.find(options);
  }

  public async save(doc: any): Promise<T> {
    // eslint-disable-next-line new-cap
    return this.model.create(doc);
  }

  public async findCount(options: any) {
    return this.model.find(options).countDocuments();
  }
}
