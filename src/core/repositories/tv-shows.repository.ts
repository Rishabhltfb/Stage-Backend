import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../interface/repository/base.abstract.repository';
import { TvShow } from '../entities/tv-show.entity';
@Injectable()
export class TvShowRepository extends BaseRepository<TvShow> {
  constructor(@InjectModel(TvShow.name) private tvShowModel: Model<TvShow>) {
    super(tvShowModel);
  }

  /**
   * Save all the tv shows provided in the list to TvShow collection
   *
   * @param {TVShowDto[]} tvShows - tvShow list dtos that needs to be saved
   * @returns {TvShow[]} - saved tvShow list documents
   */
  public async saveTvShows(tvShows: TVShowDto[]): Promise<TvShow[]> {
    const createdDocuments = await this.tvShowModel.insertMany(tvShows);
    return createdDocuments;
  }
}
